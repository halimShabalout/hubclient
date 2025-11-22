export interface AboutUsTranslated {
  story: string;
  mission: string;
  vision: string;
  values: string;
}

export interface AboutUs {
  id: number;
  imageUrl: string;
  createdAt: string; 
  updatedAt: string; 
  translated: AboutUsTranslated;
  _links: {
    self: string;
    edit: string;
    delete: string;
  };
}