
const API_URL = 'https://lessons-api.vercel.app/'; 
export interface Lesson {
  id?: number | string;
  lesson?: string;
  text?: string;
}


export const getRandomLesson = async (): Promise<Lesson | null> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error en la respuesta de la red");
    
    const data = await response.json();
    
    if (Array.isArray(data)) {
        const randomIndex = Math.floor(Math.random() * data.length);
        return data[randomIndex];
    }
    
    return data;
  } catch (error) {
    console.error("Error obteniendo la lección:", error);
    return null;
  }
};
