export interface User {
  id: number;
  name: string;
  email: string;
  lastNameP: string;
  lastNameM: string;
  password: string;
  pregunta: string;
  respuesta: string;
  role: string; // Asegúrate de que este campo exista
}


export interface Email{
  to: string;
}

export interface Response{
  codigo:string
  message:string
  status:number
  id:number
}

export interface Password{
  password:string
  ip:string
  fecha:string
}

export interface responseValid{
  status:number;
  message:string;
}
