export const COMPANY_INFO = {
  name: "Richkiss Publishers",
  established: 2010,
  headOffice: "Dome West, Accra, Ghana",
  email: "richkiss10@gmail.com",
  phone: ["+233 20 168 2254", "+233 24 437 4533"],
  aboutUs: `Richkiss Publishers is a Ghanaian-owned publishing company established in 2010 with a strong commitment to promoting literacy, quality education, and knowledge development through innovative publishing solutions.
Over the years, the company has become a recognized name in Ghana’s publishing industry, particularly in children and teens literature, book supply, and distribution services and printing services. Richkiss Publishers combines creativity, professionalism, and industry expertise to provide high-quality books and publishing services that meet the needs of schools, institutions, organizations, and the reading public.
Richkiss Publishers is especially known for its strong contribution to children’s reading materials and books that promote positive values, literacy, and African storytelling.`,
  vision: "To be a leading publishing brand in Ghana and beyond, renowned for excellence in literary publishing, and for inspiring a culture of reading among children and young adults.",
  mission: "To produce and distribute high-quality, culturally relevant, impactful supplementary readers and learning resources that promote literacy, learning, and personal development.",
  commitment: "At Richkiss Publishers, our commitment to quality is reflected in everything we do. We understand and anticipate the needs of authors, schools, institutions, and readers, ensuring that every publication meets high standards of content, design, and production. We are passionate about nurturing reading habits in children and supporting literacy development across Ghana and Africa.",
  services: [
    "Book Publishing",
    "Children’s and Young Adult Literature",
    "Educational Books and Textbooks",
    "General Printing Services",
    "Book Supply and Distribution",
    "Graphic Design",
    "Editorial and Proofreading Services",
    "Corporate Branding and Identity Materials",
    "Content Development and Publication Consultancy"
  ],
  clients: ["Princlesgh", "AGAMal", "YiKroSec", "GreenLac", "ASSN", "UMA"],
  coreValues: [
    { title: "Excellence", description: "Striving for the highest quality in every publication and service we provide." },
    { title: "Integrity", description: "Building trust through honest communication and ethical business practices." },
    { title: "Innovation", description: "Embracing new ideas and technologies to enhance the reading and learning experience." },
    { title: "Creativity", description: "Bringing imagination and original thinking to story-telling and book design." }
  ],
  events: [
    { 
      name: "Ghana International Book Fair", 
      location: "Accra-Ghana", 
      description: "A premier literary event in West Africa where we showcase our latest collections and engage with local readers.",
      gallery: [
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=600"
      ]
    },
    { 
      name: "Sharjah International Book Fair", 
      location: "Sharjah - UAE", 
      year: "2018",
      description: "One of the world's largest book fairs where Richkiss expanded its reach to the Middle Eastern market.",
      gallery: [
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1543005041-789647247bf2?auto=format&fit=crop&q=80&w=600"
      ]
    },
    { 
      name: "Cairo International Book Fair", 
      location: "Cairo-Egypt", 
      year: "2019",
      description: "Representing Ghanaian publishing excellence at the oldest and largest book fair in the Arab world.",
      gallery: [
        "https://images.unsplash.com/photo-1535905557558-afc4877bc26f?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1524311588024-d2317178412b?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1507733593714-edaf44012bc4?auto=format&fit=crop&q=80&w=600"
      ]
    },
    { 
      name: "FEJA", 
      location: "Lome Togo", 
      year: "2025",
      description: "A cultural celebration of literature where we connected with Francophone West African readers.",
      gallery: [
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600"
      ]
    },
    { 
      name: "Sharjah Publishers Conference", 
      location: "Sharjah - UAE", 
      years: ["2023", "2025"],
      description: "A key B2B event for networking with global publishers and discussing licensing and rights.",
      gallery: [
        "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=600"
      ]
    },
    { 
      name: "Chennai International Book fair", 
      location: "Chennai- India", 
      year: "2026",
      description: "Extending our footprint to South Asia, showcasing our diverse range of children's and YA titles.",
      gallery: [
        "https://images.unsplash.com/photo-1513001900722-370f803f498d?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1526724329013-4812396e987c?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?auto=format&fit=crop&q=80&w=600"
      ]
    }
  ]
};

export const BOOK_CATEGORIES = [
  {
    id: "children",
    name: "Children Books",
    slug: "children-books",
    description: "Nurturing young minds with stories that inspire and educate.",
    books: [
      { id: "c1", title: "Dowa The Caterpillar", author: "Ann-Marie P. Owusu", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800", price: "GH₵ 45.00" },
      { id: "c2", title: "Kayim's Quest for Good Fortune", author: "Ama Worla", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800", price: "GH₵ 50.00" },
      { id: "c3", title: "Harry and the Pangolin", author: "Ann-Marie P. Owusu", cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=800", price: "GH₵ 40.00" }
    ]
  },
  {
    id: "textbooks",
    name: "Textbooks",
    slug: "textbooks",
    description: "Quality educational resources for schools and institutions.",
    books: [
      { id: "t1", title: "Basic Computing for Primary Schools", author: "Richkiss Editorial", cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800", price: "GH₵ 65.00" },
      { id: "t2", title: "Integrated Science", author: "Kodjo Mensah", cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800", price: "GH₵ 70.00" }
    ]
  },
  {
    id: "novels",
    name: "Novels",
    slug: "novels",
    description: "Captivating stories for teens and young adults.",
    books: [
      { id: "n1", title: "The Crossroads", author: "Parables", cover: "https://images.unsplash.com/photo-1543005041-789647247bf2?auto=format&fit=crop&q=80&w=800", price: "GH₵ 55.00" },
      { id: "n2", title: "African Tails", author: "Ama Worla", cover: "https://images.unsplash.com/photo-1535905557558-afc4877bc26f?auto=format&fit=crop&q=80&w=800", price: "GH₵ 48.00" }
    ]
  }
];
