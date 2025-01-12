import config from "@/lib/config";
const { apiBaseUrl } = config;
const serverIP = `${apiBaseUrl}/api`;

function getAccessToken() {
    const token = sessionStorage.getItem('access_token');
    return token ? 'Bearer ' + token : ''; 
}


function postFormDataReqOpts(
    data: any,
    admin?: boolean,
    isPatch?: boolean,
    includeJWT?: boolean,
    
) {
    const headers = new Headers();
    headers.append("Accept","application/json");
    admin && headers.append("admin","true");
    includeJWT && headers.append("Authorization", getAccessToken());

    const body = new FormData();

    for (const [key, value] of Object.entries(data)) {
        if (value instanceof File) {
            body.append(key, value);
        } else if ((value instanceof FileList || Array.isArray(value)) && value.length > 0) {
            const files = Array.isArray(value) ? value : Array.from(value);
            // Loop through the array of files and append each one to FormData
            files.forEach(file => {
                body.append(key, file);
            });
        } else if (typeof value === "string" || typeof value === "number" || typeof value === 'boolean') {
            body.append(key, value.toString()); 
        } else {
            console.warn(`Skipping unsupported data type for key: ${key}`, value);
        }
    }

    return {
        method: isPatch ? "PATCH" : "POST",
        headers,
        body
    };
};

function postReqOpts (
    data: any,
    admin?: boolean,
    includeJWT?: boolean,
    
) {
    const headers = new Headers();
    headers.append("Content-Type","application/json");
    headers.append("accept","application/json");
    admin && headers.append("admin","true");
    includeJWT && headers.append("Authorization",getAccessToken());
    return {
        method: "POST",
        headers,
        body: JSON.stringify(data),
    }
}

function patchReqOpts (
    data?:any,
    admin?: boolean,
    includeJWT?: boolean,
    
) {
    const headers = new Headers();
    headers.append("Content-Type","application/json");
    headers.append("Accept","Application/json");
    admin && headers.append("admin","true");
    includeJWT && headers.append("Authorization", getAccessToken());
    return {
        method: "PATCH",
        headers,
        body: data ? JSON.stringify(data) : undefined,
    }
}

function getReqOpts(
    admin?: boolean,
    includeJWT?: boolean,
) {
    const headers = new Headers();
    headers.append("Content-Type","application/json");
    headers.append("Accept","application/json");
    headers.append("ngrok-skip-browser-warning", "true");
    if(admin) {
        admin && headers.append("admin","true");
    }
    includeJWT && headers.append("Authorization", getAccessToken());
    return {
        method: "GET",
        headers,
    }
}

function deleteReqOpts (
    admin?: boolean,
    includeJWT?: boolean ,
    
) {
    const headers = new Headers();
    headers.append("Content-Type","application/json");
    headers.append("Accept","application/json");
    admin && headers.append("admin","true");
    includeJWT && headers.append("Authorization",getAccessToken());
    return {
        method: "DELETE",
        headers,
    }
}


// ------PUBLIC FUNCTIONS-------- //

function API_PostFormData(
    endpoint: string,
    data: any,
    admin?: boolean,
    isPatch?: boolean,
    authRequired?: boolean,
) {
    return new Promise((resolve, reject) => {
        fetch(`${serverIP}/${endpoint}`, postFormDataReqOpts(data, admin, isPatch, authRequired))
            .then((res) => {
                if(!res.ok) {
                    throw new Error(`HTTP error! ${res.status}`);
                }
                return res;
            })
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(`API_POSTFORM error: ${err.message}`);
            })
    })
}

function API_Post(
    endpoint: string,
    data:any,
    admin?: boolean,
    authRequired?: boolean,  
) {
    return new Promise((resolve, reject) => {
        
        fetch(`${serverIP}/${endpoint}`, postReqOpts(data, admin, authRequired))
            .then((res) => {
                if(!res.ok) {
                    throw new Error(`Error! ${res.status}`);
                }
                return res.status
            })
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(`API_Post error! ${err.message}`)
            })
    })
}

function API_Patch (
    endpoint: string,
    data?: any,
    admin?: boolean,
    authRequired?: boolean,
    
) {
    return new Promise((resolve, reject) => {
        fetch(`${serverIP}/${endpoint}`, patchReqOpts(data, admin, authRequired))
            .then((res) => {
                if(!res.ok) {
                    throw new Error(`Error! ${res.status}`);
                }
                return res.status
            })
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(`API_Patch error! ${err.message}`)
            })
    })
}

function API_Get (
    endpoint: string,
    admin?: boolean,
    authRequired?: boolean,

) {
    return new Promise((resolve, reject) => {
        fetch(`${serverIP}/${endpoint}`, getReqOpts(admin, authRequired))
            .then((res) => {
                if(!res.ok) {
                    throw new Error(`Error! ${res.status}`);
                }
                return res.json();
            })
            
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(`API_Get error! ${err.message}`)
            })
    })
}

function API_Delete (
    endpoint: string,
    admin?: boolean,
    authRequired?: boolean,
    
) {
    return new Promise((resolve, reject) => {
        fetch(`${serverIP}/${endpoint}`, deleteReqOpts(admin, authRequired))
            .then((res) => {
                if(!res.ok) {
                    throw new Error(`Error! ${res.status}`);
                }
                return res.status
            })
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(`API_Get error! ${err.message}`)
            })
    })
}

async function API_ImageUpload (imageFile:any, admin?:boolean) {
    const headers = new Headers();
    admin && headers.append("admin", "true");
    const formData = new FormData();
    formData.append('image', imageFile);  
    console.log(imageFile,"image")

    try {
        const response = await fetch(`${serverIP}/image-upload`, {
            method: 'POST',
            headers,
            body: formData,
        });

        const result = await response.json();
        console.log(result,"ress")
        
        if (!response.ok) {
            throw new Error(result.message || 'Failed to upload image');
        }

        return result;  // Assuming the server returns the image URL
    } catch (error) {
        console.error('Image upload failed:', error);
        throw error;
    }
}

function API_GetImage(fileName: string) {
    return `${apiBaseUrl}/${fileName}`;
}

export {
    API_Delete,
    API_Get,
    API_Patch,
    API_Post,
    API_PostFormData,
    API_GetImage,
    API_ImageUpload,
}