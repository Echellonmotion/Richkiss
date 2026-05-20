export const COMPANY_INFO = {
  name: "Richkiss Publishers",
  established: 2010,
  headOffice: "Dome West, Accra, Ghana",
  email: "richkiss10@gmail.com",
  phone: ["+233 20 168 2254", "+233 24 437 4533"],
  whatsapp: "233244374533",
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
      { 
        id: "c1", 
        title: "BASIC MANNERS, WHAT EVERY CHILD SHOULD KNOW", 
        author: "NANA MANUKURE KISSIEDU", 
        cover: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800", 
        price: "GH₵ 45.00",
        year: "2016",
        isbn: "978-9988-2-3851-3",
        dimensions: "8.5 x 8.8 INCHES",
        bindingPages: "PAPERBACK / SADDLE STITCH BINDING / 42 PAGES",
        description: "A child’s moral and ethical development begins during the formative years of life. The choices they make and the character they build in the future are greatly influenced by the guidance and training they receive early on.\n\nBasic Manners, What Every Child Should Know is a practical guide designed to help shape a child’s character and behavior. It is highly recommended for parents and teachers as a valuable tool for instilling essential values such as integrity, respect, responsibility, fairness, and honesty in children."
      },
      { 
        id: "c2", 
        title: "MY E-BOOK", 
        author: "NANA MANUKURE KISSIEDU", 
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800", 
        price: "GH₵ 35.00",
        year: "2017",
        isbn: "978-9988-2-5921-1",
        dimensions: "7.4 x 7.5 INCHES",
        bindingPages: "PAPERBACK / SADDLE STITCH BINDING / 16 PAGES",
        description: "This book introduces readers to the world of e-books, what they are, their purpose, and the many benefits they offer. In today’s era of digital transformation, it is important for every pupil to understand and appreciate digital learning resources. This book provides the knowledge and guidance children need to become familiar with e-books and how they can support learning, reading, and creativity."
      },
      { 
        id: "c3", 
        title: "The BOOK FAIR", 
        author: "NANA MANUKURE KISSIEDU", 
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800", 
        price: "GH₵ 40.00",
        year: "2017",
        isbn: "978-9988-2-5971-3",
        dimensions: "6.4 x 7.4 INCHES",
        bindingPages: "PAPERBACK / SADDLE STITCH BINDING / 36 PAGES",
        description: "This story educates children about what happens during book fairs, one of the major platforms publishers use to market and promote books. Through an engaging narrative, the author highlights the importance of children and schools participating in book fairs and emphasizes the vital role these events play in encouraging a reading culture among children."
      },
      { 
        id: "c4", 
        title: "BOOK PAL", 
        author: "NANA MANUKURE KISSIEDU", 
        cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=800", 
        price: "GH₵ 38.00",
        year: "2017",
        isbn: "978-9988-2-5920-4",
        dimensions: "6.7 x 8.2 INCHES",
        bindingPages: "PAPERBACK / SADDLE STITCH BINDING / 22 PAGES",
        description: "This book highlights the joys of joint reading as an effective way to motivate, build, and sustain a reading culture in children. It captures the exciting experiences of pupils from two different classes who were paired together to read entertaining and educational books of their choice, promoting teamwork, confidence, and a love for reading."
      },
      { 
        id: "c5", 
        title: "KOJO WRITES A STORY", 
        author: "NANA MANUKURE KISSIEDU", 
        cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800", 
        price: "GH₵ 42.00",
        year: "2020",
        isbn: "978-9988-3-5329-2",
        dimensions: "8.5 x 8.8 INCHES",
        bindingPages: "PAPERBACK / SADDLE STITCH BINDING / 36 PAGES",
        description: "With just days left in the mid-term break, all Kojo had were blank pages and no story to present to Mrs. Appiah, his teacher. Their assignment was to come up with a story and present it in class. His friends were counting on him to help them write their stories. Meanwhile, Annie, his sister, made fun of him and his friends for not having a story. His father helped him with an idea. Kojo pulled a surprise in class; this was inspired by his sister’s mockery, his father’s guidance and his creative abilities."
      },
      { 
        id: "c6", 
        title: "AZIZANYA, THE VILLAGE BETWEEN WATERS", 
        author: "NANA MANUKURE KISSIEDU", 
        cover: "https://images.unsplash.com/photo-1507733593714-edaf44012bc4?auto=format&fit=crop&q=80&w=800", 
        price: "GH₵ 50.00",
        year: "2024",
        isbn: "978-9988-3-9349-6",
        dimensions: "8.5 x 8.8 INCHES",
        bindingPages: "PAPERBACK / SADDLE STITCH BINDING / 52 PAGES",
        description: "Bordered by the serene Volta River and the vast Atlantic Ocean, the ancestral village of young Amala and her siblings lies. Her affinity for nature and greenery made her fall in love with the beautiful islands and their unique landscape on their first visit. But the troubling sight of littered paths and polluted mangroves made her unhappy. She embarked on a transformative journey to awaken a sense of responsibility in the village youth. Will Amala and her siblings succeed in rekindling the villagers’ connection to their land, or will she be subdued by their bad influence?"
      }
    ]
  },
  {
    id: "tapa-series",
    name: "Tapa Series",
    slug: "tapa-series",
    description: "An inspiring series following the adventures of a kind-hearted boy named Tapa.",
    books: [
      { 
        id: "ts1", 
        title: "TAPA’s Heart of Gold", 
        author: "NANA MANUKURE KISSIEDU", 
        cover: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?auto=format&fit=crop&q=80&w=800", 
        price: "GH₵ 35.00",
        year: "2026",
        isbn: "978-9988-42-598-2",
        dimensions: "6.7 x 8.2 INCHES",
        bindingPages: "PAPERBACK / SADDLE STITCH BINDING / 20 PAGES",
        description: "Tapa’s Heart of Gold is a heartwarming story about a kind and intelligent boy who believes that kindness can change the world. Despite coming from a poor family, Tapa always finds ways to help others, from guiding a visually impaired friend to supporting classmates with special needs. When one simple act of kindness leads to an unexpected reward, Tapa discovers that a caring heart is truly worth more than gold."
      },
      { 
        id: "ts2", 
        title: "TAPA’s Clean-Up Adventures", 
        author: "NANA MANUKURE KISSIEDU", 
        cover: "https://images.unsplash.com/photo-1526724329013-4812396e987c?auto=format&fit=crop&q=80&w=800", 
        price: "GH₵ 35.00",
        year: "2026",
        isbn: "978-9988-42-600-2",
        dimensions: "6.7 x 8.2 INCHES",
        bindingPages: "PAPERBACK / SADDLE STITCH BINDING / 24 PAGES",
        description: "When rubbish take over the little town of Creek Valley, one small boy refuses to stay quiet. Tapa may be young, but he has a big heart and a bold idea! With courage, teamwork, and the help of his friends and other children in the community, Tapa sets out to clean up his town. Will their hard work make a difference?"
      },
      { 
        id: "ts3", 
        title: "TAPA’s Book Club", 
        author: "NANA MANUKURE KISSIEDU", 
        cover: "https://images.unsplash.com/photo-1513001900722-370f803f498d?auto=format&fit=crop&q=80&w=800", 
        price: "GH₵ 35.00",
        year: "2026",
        isbn: "978-9988-42-601-9",
        dimensions: "6.7 x 8.2 INCHES",
        bindingPages: "PAPERBACK / SADDLE STITCH BINDING / 20 PAGES",
        description: "Tapa’s Book Club is an inspiring children’s story about a young boy whose love for books changes his entire neighborhood. Tapa treasures stories more than anything and dreams of sharing the joy of reading with other children. With determination, kindness, and imagination, he starts a small book club under a big mango tree, where children gather every Saturday to read, learn, and dream together."
      }
    ]
  },
  {
    id: "featured-new",
    name: "New Releases (2025)",
    slug: "new-releases",
    description: "Our latest publications designed to enchant and educate.",
    books: [
      { 
        id: "new1", 
        title: "WORLA WANTS ANOTHER FRIEND", 
        author: "NANA MANUKURE KISSIEDU", 
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800", 
        price: "GH₵ 40.00",
        year: "2025",
        isbn: "978-9988-3-9659-6",
        dimensions: "8.5 x 8.8 INCHES",
        bindingPages: "PAPERBACK / SADDLE STITCH BINDING / 16 PAGES",
        description: "Join six-year-old Worla as she takes you through her world of family, friends, and fun, counting her way from one special doll to ten busy hens. This book teaches counting in an interesting way."
      },
      { 
        id: "new2", 
        title: "GRANDMA JANET, The culinary Queen", 
        author: "NANA MANUKURE KISSIEDU", 
        cover: "https://images.unsplash.com/photo-1604135398902-89b1d43ff98e?auto=format&fit=crop&q=80&w=800", 
        price: "GH₵ 48.00",
        year: "2025",
        isbn: "978-9988-52-734-1",
        dimensions: "8.5 x 8.8 INCHES",
        bindingPages: "PAPERBACK / SADDLE STITCH BINDING / 33 PAGES",
        description: "Join siblings Kwayisi and Yaa on a delightful adventure filled with love, laughter, and the magic of family. This heartwarming story celebrates the beautiful bond between grandparents and grandchildren, and the rich, delicious flavours of home."
      },
      { 
        id: "new3", 
        title: "LE SAVOIR-VIVRE, CE QUE CHAQUE ENFANT DOIST SAVOIR", 
        author: "NANA MANUKURE KISSIEDU", 
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800", 
        price: "GH₵ 50.00",
        year: "2025",
        isbn: "978-9988-52-118-9",
        dimensions: "8.5 x 8.8 INCHES",
        bindingPages: "PAPERBACK / SADDLE STITCH BINDING / 42 PAGES",
        description: "Le développement moral et éthique d'un enfant commence dès son plus jeune âge. « Les bonnes manières: ce que chaque enfant devrait savoir » est un guide pratique conçu pour contribuer à façonner le caractère et le comportement d'un enfant."
      }
    ]
  }
];
