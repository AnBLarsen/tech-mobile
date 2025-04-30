/* eslint-disable @typescript-eslint/no-explicit-any */

const APIURL = process.env.NEXT_PUBLIC_API_URL

export async function createOrders(token: string, products: number[]) {
    try {
        const response = await fetch(`${APIURL}/orders`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: token
            },
            body: JSON.stringify({products})
        });
        if(response.ok){
            
            return response.json();
        } else {
            
            throw new Error("Error while trying to complete the purchase")
        }

    } catch (error:any) {
        throw new Error(error)
    }
    

}
export async function getOrders(token: string) {
    try {
        const response = await fetch(`${APIURL}/users/orders`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: token
            },
        });
        return response.json();
    } catch (error:any) {
        throw new Error(error)
    }
    

}

