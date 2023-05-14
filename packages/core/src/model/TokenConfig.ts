type Address = string; //`0x${string}`

export type TokenConfig = {
    address:Address,
    symbol:string,
    imageURL:string,
    decimals:number,
    type:string    
}