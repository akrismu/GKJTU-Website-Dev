import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL; 


export const fetchArticles = async (local = 'en') => {
  try {
    const response = await axios.get(`${API_URL}/news-articles?limit=100&locale=${local}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

export const fetchArticleById = async (id, local = 'en') => {
  try {
    const response = await axios.get(`${API_URL}/news-articles/${id}?locale=${local}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
};

export const fetchChurches = async (local = 'en') => {
  try {
    const response = await axios.get(`${API_URL}/churches?limit=100&locale=${local}`);
    console.log("API URL: ", `${API_URL}/churches?limit=100&locale=${local}`)
    return response.data;
  } catch (error) {
    console.error('Error fetching churches:', error);
    return { docs: [] };
  }
};

export const fetchChurchById = async (id, local = 'en') => {
  try {
    const response = await axios.get(`${API_URL}/churches/${id}?locale=${local}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
};


export const fetchEmployees = async(local = 'en') => {
  try {
    const response = await axios.get(`${API_URL}/Employee?limit=20&locale=${local}&sort=id`);

    const data = await response.data;

    const charimen = [];
    const employees = [];
    data.docs.forEach(doc => {
      if (doc.role.toLowerCase() === 'charimen') {
        charimen.push(doc);
      } else {
        employees.push(doc);
      }
    });
    return { charimen, employees };
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    return { charimen: [], employees: [] };
  }
}

export const fetchBanner = async(catagory) => {
  try {
    const response = await axios.get(`${API_URL}/banners?where[pageCategory][equals]=${catagory}&where[type][equals]=banner`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Banner:", error);
    return null;
  }
}

export const fetchImages = async(catagory) => {
  try {
    const response = await axios.get(`${API_URL}/banners?where[pageCategory][equals]=${catagory}&where[type][equals]=other`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Banner:", error);
    return null;
  }
}