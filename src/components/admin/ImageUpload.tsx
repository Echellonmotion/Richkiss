import React, { useState, useRef } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../lib/firebase';
import { UploadCloud, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  folder?: string;
  label?: string;
}

export default function ImageUpload({ onUploadComplete, folder = 'general', label = 'Upload Image' }: ImageUploadProps) {
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

    if (file.size > 5 * 1024 * 1024) { // Increased to 5MB
      setError('Image size should be less than 5MB.');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(false);
    setProgress(0);

    if (!storage) {
      setError('Firebase Storage is not initialized. Please check configuration.');
      return;
    }
    
    try {
      console.log('Starting simple upload to:', `${folder}/${file.name}`);
      const storageRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);
      
      setUploading(true);
      setError(null);
      setSuccess(false);
      setProgress(0);

      const snapshot = await uploadBytes(storageRef, file);
      console.log('Upload successful, getting URL...');
      setProgress(100);
      
      const downloadURL = await getDownloadURL(snapshot.ref);
      onUploadComplete(downloadURL);
      setSuccess(true);
    } catch (err: any) {
      console.error('Upload Error Code:', err.code);
      console.error('Upload Error Message:', err.message);
      let msg = err.message;
      if (err.code === 'storage/unauthorized') msg = 'Unauthorized. Ensure Storage is enabled and rules allow writes.';
      setError(`Upload failed: ${msg}`);
    } finally {
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
          <div className="flex flex-col items-center space-y-2">
            <AlertCircle className="text-red-500" size={32} />
            <p className="text-xs font-bold uppercase tracking-widest text-red-500">{error}</p>
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
