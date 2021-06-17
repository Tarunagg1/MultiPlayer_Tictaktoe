export const genrateRandomid = ()=>{
    const a = Math.round(Math.random() * (6121505481-1) + 1)
    let randomID = "AKP_id"+a+"_ROOM";
    return randomID;
}

