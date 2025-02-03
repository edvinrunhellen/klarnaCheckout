import fetch from 'node-fetch'


export function getKlarnaAuth() {
    const username = process.env.PUBLIC_KEY
    const password = process.env.SECRET_KEY
    const auth = `Basic ${Buffer.from(username + ":" + password).toString("base64")}`
    return auth
}

//skapa order hos klarna
export async function createOrder(product) {
    const auth = getKlarnaAuth
    const path = '/checkout/vs/orders'
    const url = process.env.BASE_URL + path
    const method = 'POST'
    const headers = {
        'Content-Type': 'application/json',
        Authorization: auth
    }
    const quantity = 1;
    const price = product.price * 100
    const total_amount = price * quantity
    const total_tax_amount = total_amount * 0.2

    const payload = {
        purchase_country: 'SE',
        purchase_currency: 'SEK',
        locale: 'sv-SE',
        order_amount: total_amount,
        order_tax_amount: total_tax_amount,
        order_lines: [
            {
                type: 'physical',
                reference: product.id,
                name: product.title,
                quantiiy,
                quantity_unit: 'pcs',
                unit_price: price,
                tax_rate: 2500,
                total_amount,
                total_discount_amount: 0,
                total_tax_amount,
                image_url: product.image
            }
        ],
        merchant_urls: {
            terms: null,
            checkout: null,
            confirmation: null,
            push: null
        }
    }
    const body = JSON.stringify(payload)
    const respone = await fetch(url, { method, headers, body })
    const json = await response.json()
    if (response.status === 200 || response.status === 201) {
        return json
    } else {
        console.error(json)
        return {
            html_snippet: `<h1>${JSON.stringify(json)}</h1>`
        }
    }
}

export async function retrieveOrder(product) {

}