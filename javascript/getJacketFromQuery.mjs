//Unique ID From Product 

export const getJacketIdFromQuery = async function() {
    const urlParam = new URLSearchParams(window.location.search);
    return urlParam.get('id');
};