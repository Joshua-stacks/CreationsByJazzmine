import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config();

import PRODUCTS from './data.js';

const port = process.env.PORT;
const token = process.env.ACCESS_TOKEN;

const importData = async () => {
    const response = await Promise.all(PRODUCTS.map((product) => {
        return fetch(`http://localhost:${port}/api/products`, {
            method: 'POST',
            body: JSON.stringify({
                data: {
                    ...product
                }
            })
        })
    }))
}

const importSingleton = async () => {
    const product = PRODUCTS[0];

    const url = `http://localhost:${port}/api/products`;

    const test = {
        "data": [
            {
                "id": 25,
                "attributes": {
                    "name": "CustomChipBags.jpg",
                    "alternativeText": "CustomChipBags.jpg",
                    "caption": "CustomChipBags.jpg",
                    "width": 480,
                    "height": 537,
                    "formats": {
                        "small": {
                            "ext": ".jpg",
                            "url": "/uploads/small_Custom_Chip_Bags_85c44d6401.jpg",
                            "hash": "small_Custom_Chip_Bags_85c44d6401",
                            "mime": "image/jpeg",
                            "name": "small_CustomChipBags.jpg",
                            "path": null,
                            "size": 52.09,
                            "width": 447,
                            "height": 500
                        },
                        "thumbnail": {
                            "ext": ".jpg",
                            "url": "/uploads/thumbnail_Custom_Chip_Bags_85c44d6401.jpg",
                            "hash": "thumbnail_Custom_Chip_Bags_85c44d6401",
                            "mime": "image/jpeg",
                            "name": "thumbnail_CustomChipBags.jpg",
                            "path": null,
                            "size": 8.11,
                            "width": 140,
                            "height": 156
                        }
                    },
                    "hash": "Custom_Chip_Bags_85c44d6401",
                    "ext": ".jpg",
                    "mime": "image/jpeg",
                    "size": 57.97,
                    "url": "/uploads/Custom_Chip_Bags_85c44d6401.jpg",
                    "previewUrl": null,
                    "provider": "local",
                    "provider_metadata": null,
                    "createdAt": "2022-11-28T01:57:58.848Z",
                    "updatedAt": "2022-11-28T02:13:09.701Z"
                }
            }
        ]
    }

    const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                data: {
                    name: product.name,
                    price: product.price,
                    min: product.min,
                    max: product.max,
                    category: product.category.toLowerCase(),
                    media: null,
                    options: null,
                    description: null

                }
            }),
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log(res)


    const msg = await res.json()
}

importSingleton().then(msg => console.log(msg))