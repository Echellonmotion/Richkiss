import React, { useState, useRef } from 'react';
import { UploadCloud, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  folder?: string;
  label?: string;
}

export default function ImageUpload({ onUploadComplete, label = 'Upload Image' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB.');
      return;
    }

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      setError('CONFIG_MISSING');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(false);
    setProgress(0);

    try {
      if (!navigator.onLine) {
        throw new Error('You are currently offline. Please check your internet connection.');
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const pct = (event.loaded / event.total) * 100;
          setProgress(Math.round(pct));
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          console.log('Upload successful:', response.secure_url);
          onUploadComplete(response.secure_url);
          setSuccess(true);
          setUploading(false);
        } else {
          try {
            const err = JSON.parse(xhr.responseText);
            console.error('Cloudinary Error:', err?.error?.message || err);
            setError(`Upload failed: ${err.error?.message || 'Unknown error'}`);
          } catch (parseErr) {
            console.error('Cloudinary Parse Error:', xhr.responseText);
            setError('Upload failed: Invalid response from server.');
          }
          setUploading(false);
        }
      };

      xhr.onerror = () => {
        setError('Network error during upload.');
        setUploading(false);
      };

      xhr.send(formData);
    } catch (err: any) {
      console.error('Initiation Error:', err?.message || err);
      setError(`Failed to start upload: ${err?.message || 'Unknown error'}`);
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">{label}</label>}
      
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={`group relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 cursor-pointer transition-all ${
          uploading ? 'bg-brand-beige/20 border-brand-primary/20 cursor-not-allowed' : 
          error ? 'bg-red-50 border-red-200 hover:border-red-300' : 
          success ? 'bg-green-50 border-green-200' : 
          'bg-brand-beige/50 border-transparent hover:border-brand-primary/30 hover:bg-white text-brand-muted hover:text-brand-primary'
        }`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*"
          disabled={uploading}
        />

        {uploading ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <Loader2 className="animate-spin text-brand-primary absolute inset-0" size={64} />
              <span className="text-[10px] font-bold text-brand-primary">{progress}%</span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest">Uploading...</p>
          </div>
        ) : success ? (
          <div className="flex flex-col items-center space-y-2">
            <CheckCircle2 className="text-green-500" size={32} />
            <p className="text-xs font-bold uppercase tracking-widest">Upload Complete</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center space-y-3 text-center px-4">
            <AlertCircle className="text-red-500" size={32} />
            {error === 'CONFIG_MISSING' ? (
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-red-500">Config Required</p>
                <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                  <p className="text-[10px] text-red-700 leading-relaxed font-sans">
                    Please set <code className="font-mono bg-red-100 px-1 rounded">VITE_CLOUDINARY_CLOUD_NAME</code> and <code className="font-mono bg-red-100 px-1 rounded">VITE_CLOUDINARY_UPLOAD_PRESET</code> in your Project Secrets.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs font-bold uppercase tracking-widest text-red-500">{error}</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <UploadCloud size={32} className="transition-transform group-hover:-translate-y-1" />
            <p className="text-xs font-bold uppercase tracking-widest">Tap to select or drop</p>
            <p className="text-[10px] text-gray-400">JPG, PNG or WEBP (Max 2MB)</p>
          </div>
        )}
      </div>
    </div>
  );
}
