
export type ProductCategory = 'Machinery' | 'Machinery Tools' | 'Brass Components' | 'SS Components' | 'Precision Components';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  application: string;
  image: string;
  manufacturedIn: string;
}

export interface Leadership {
  ceo: {
    name: string;
    image: string;
    message: string;
    designation: string;
  };
  opsHead: {
    name: string;
    image: string;
    message: string;
    designation: string;
  };
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  product?: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'responded';
}

export interface SiteSettings {
  language: string;
  primaryColor: string;
  companyName: string;
  address: string;
  contactNumber: string;
}
