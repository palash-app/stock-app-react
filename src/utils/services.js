import API from "./URL.js";
import { Response } from "./utils.js";
// export const callApi = async ({
//   endpoint,
//   method,
//   body,
//   accessToken,
//   fileToUpload,
// }) => {
//   try {
//     let headers = {};
//     let baseUrl = `${API.BASE_URL}${endpoint}`;
//     if (accessToken) {
//       let token = await RetrieveData(Strings.TOKEN);
//       headers["oauth-token"] = token;
//     }
//     if (fileToUpload) {
//       headers["Content-Type"] = "multipart/form-data";
//     } else {
//       headers["Content-Type"] = "application/json";
//     }
//     let config = {
//       method: method,
//       url: baseUrl,
//       data: body,
//       headers: headers,
//     };
//     console.log(config);
//     let response = await axios(config);
//     if (response) {
//       return { response: response.data, type: "success" };
//     }
//   } catch (err) {
//     console.log("ERROR >>>>>>>>>>>>>>>>>>> ", err);
//     if (err?.response?.data) {
//       if (err.response.status === 401) {
//         logout();
//         return { response: err.response.data, type: "failure" };
//       } else {
//         return { response: err.response.data, type: "failure" };
//       }
//     } else {
//       return { response: err, type: "failure" };
//     }
//   }
// };

export function checkQuery(query) {
    // Check "given" array
    if (!checkArrayRegex(query.given)) {
        return false;
    }

    // Check "when" array
    if (!checkArrayRegex(query.when)) {
        return false;
    }

    // Check "then" array
    if (!checkArrayRegex(query.then)) {
        return false;
    }

    // All checks passed
    return true;
}

export function checkArrayRegex(array) {
    // Check if the array exists and is an array
    if (!Array.isArray(array)) {
        // console.log("Not Array");
        return false;
    }

    if (array.length == 0) {
        // console.log("array length = 0");
        return false;
    }
    // Iterate over array elements
    for (const obj of array) {
        // Check if the object has 'str' and 'regex' properties
        if (obj && obj.str && obj.regex) {
            const regex = new RegExp(obj.regex);
            // Check if the 'str' property matches the regex
            if (!regex.test(obj.str)) {
                // console.log("!regex matched");
                return false;
            }
        } else {
            // If the object is missing required properties, return false
            return false;
        }
    }

    // All checks passed for the array
    return true;
}

export const apiPostWithTimeOut = async (url, timeout, data) => {
    // Create a new promise that rejects after 2 minutes
    const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('Request timed out')), timeout);
    });

    const fetchPromise = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const response = await Promise.race([fetchPromise, timeoutPromise]);
        if (!response.ok) {
            return new Response(response.ok, null, response.error);
        }
        const data = await response.json();
        return new Response(response.ok, data, null);
    } catch (error) {
        return new Response(false, null, null);
    }
};
