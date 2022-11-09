import type {Application, Container } from "pixi.js"

export default async (app:Application,container:Container,x?:number,y?:number)=>{
    const promise = new Promise((resolve,reject) =>{
        const imageData = app.renderer.plugins.extract.image(container);
        imageData.onload = ()=>{
            return resolve(imageData);
        }
    })
    return await promise; 
}