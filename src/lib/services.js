// SignUp Service
export const signUp = async (data) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}:8080/api/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Login Service
export const login = async (data) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}:8080/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};
