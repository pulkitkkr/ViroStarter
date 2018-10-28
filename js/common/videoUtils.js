import videoData from './Videos';

const getGenre = (data=[],requiredGenre="")=> {
    const newData = [...data].filter((song)=>{
        return(song.genre == requiredGenre)
    });
    console.log(newData,requiredGenre);
    let returnValue = newData.length >=1 ? newData : data;
    return returnValue;
};
const getOld = (data=[],requiredOld=false)=> {
    const newData = [...data].filter((song)=>(song.old == requiredOld));
    let returnValue = newData.length >=1 ? newData : data;
    return returnValue;
};
const getMale = (data=[],requiredMale=true)=> {
    const newData = [...data].filter((song)=>(song.male == requiredMale));
    let returnValue = newData.length >=1 ? newData : data;
    return returnValue;
};

export default getSongs = (genre, male, old)=> {
    let genreSpecificSongs = getGenre(videoData, genre);
    let maleSpecificSongs = getMale(genreSpecificSongs, male);
    let oldSpecificSongs = getOld(maleSpecificSongs, old);
    let miniaturefinal = oldSpecificSongs.length > 0 ? oldSpecificSongs : genreSpecificSongs;
    let dm = [];
    miniaturefinal.map((ind)=>{
        dm.push(ind.src)
    })
    console.log("in getSongs",dm)
    return dm
}