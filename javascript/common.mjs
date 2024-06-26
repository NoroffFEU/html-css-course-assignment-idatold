


export async function fetchDataFromAPI() {
  try {
    const response = await fetch("https://api.noroff.dev/api/v1/rainy-days");


    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);

  }
}




