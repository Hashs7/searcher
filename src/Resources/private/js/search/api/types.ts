export interface ApiProduct {
    _index: string,
    _type: string,
    _id: number,
    _score: number,
    _source: {
        enabled: boolean,
        name_en_us: string,
        option_mug_type: string[],
        attribute_mug_material: string[],
        product_taxons: string[],
        channels: string[],
        price_us_web: number,
        sold_units: number,
        product_created_at: number
    }
}

export interface ApiProductResponse {
    products: ApiProduct[]
}