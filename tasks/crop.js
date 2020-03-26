console.log("Init task: Cropping images");

//Require
const {resolve} = require('path');
const fs = require('fs-extra');
const appConfigPath = resolve(__dirname, '../app/config/app_config.js');
const cropConfigPath = resolve(__dirname, '../app/config/config_crop.js');
const imagesDestPath = resolve(__dirname, '../app/assets/images/crop/');
let sizeOf = require('image-size');
var MD5 = require("crypto-js/md5");

let Clipper = require('image-clipper');
let Canvas = require('canvas');
let clipper = Clipper();
Clipper.configure({
  canvas: Canvas
})

console.log("App config");
let GLOBAL_CONFIG = require(appConfigPath);
console.log(GLOBAL_CONFIG);

console.log("Crop config");
let GLOBAL_CONFIG_CROP = require(cropConfigPath);
console.log(GLOBAL_CONFIG_CROP);


//Global vars
let currentImage = 0;
let currentRow = 0;
let currentColumn = 0;
let generatedPieces = [];
let currentPiece = 0;
let solution = "";
let reverse_mode = false;

//Get images from config
let images = [GLOBAL_CONFIG_CROP.image_solution_face];

for(let k=1; k<11; k++){
  if(typeof GLOBAL_CONFIG_CROP["image_fake" + k + "_face"] === "string"){
    images.push(GLOBAL_CONFIG_CROP["image_fake" + k + "_face"]);
  }
}

if(typeof GLOBAL_CONFIG_CROP.image_solution_reverse === "string"){
  reverse_mode = true;
  images.push(GLOBAL_CONFIG_CROP.image_solution_reverse);

  for(let k=1; k<11; k++){
    if(typeof GLOBAL_CONFIG_CROP["image_fake" + k + "_face"] === "string"){
      images.push(GLOBAL_CONFIG_CROP["image_fake" + k + "_reverse"]);
    }
  }
}

cropNextImage = function(callback){
  if(currentImage >= images.length){
    return callback();
  }

  currentRow = 0;
  currentColumn = 0;
  currentPiece = 0;
  currentImage = currentImage+1;

  let imagePath = resolve(__dirname, '../app/' + images[currentImage-1]);
  sizeOf(imagePath, function (err, dimensions) {
    let imageWidth = dimensions.width;
    let imageHeight = dimensions.height;

    let squareWidth = imageWidth/GLOBAL_CONFIG.M;
    let squareHeight = imageHeight/GLOBAL_CONFIG.N;

    cropNextPiece(imagePath,squareWidth,squareHeight,function(){
      console.log("Cropped image " + currentImage);
      return cropNextImage(callback);
    })
  });
}

cropNextPiece = function(image,width,height,callback){
  currentPiece = currentPiece+1;

  crop(image,width*currentColumn,height*currentRow,width,height,function(){
    console.log("Cropped piece [" + currentRow + "," + currentColumn + "] from image " + currentImage);

    let lastPiece = ((currentRow===GLOBAL_CONFIG.N-1) && (currentColumn===GLOBAL_CONFIG.M-1));
    if(lastPiece===true){
      return callback();
    }
    if(currentColumn<GLOBAL_CONFIG.M-1){
      currentColumn = currentColumn+1;
    } else if(currentRow<GLOBAL_CONFIG.N-1) {
      currentColumn = 0;
      currentRow = currentRow+1;
    }
    // if(currentRow<GLOBAL_CONFIG.N-1){
    //   currentRow = currentRow+1;
    // } else if(currentColumn<GLOBAL_CONFIG.M-1) {
    //   currentRow = 0;
    //   currentColumn = currentColumn+1;
    // }
    return cropNextPiece(image,width,height,callback);
  });
}

crop = function(image,x,y,width,height,callback,){
  let imageId = generateImageId();
  let imgDestPath = imagesDestPath + "/" + imageId + ".jpg";
  Clipper(image, function() {
    this.crop(x,y,width,height)
      .quality(100)
      .toFile(imgDestPath, function() {
        let imgObject = {id: imageId, path: "./assets/images/crop/" + imageId + ".jpg"};
        if((reverse_mode === false)||(currentImage <= images.length/2)){
          //Image is a piece's face
          generatedPieces.push({face: imgObject});
        } else {
          //Image is a piece's reverse
          var pieceIndex = ((currentImage-(images.length/2)-1) * GLOBAL_CONFIG.N * GLOBAL_CONFIG.M) + (currentPiece-1);
          generatedPieces[pieceIndex]["reverse"] = imgObject;
        }
        if(currentImage === 1){
          solution = solution + imageId;
        }
        callback();
      });
  });
}

let generated_ids = [];
generateImageId = function(){
  let id_candidate = Math.round(Math.random()*100000) + "";
  if(generated_ids.indexOf(id_candidate)===-1){
    generated_ids.push(id_candidate);
    return id_candidate;
  } else {
    if(generated_ids.length < 1000){
      return generateImageid();
    }
  }
}

shuffle = function(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

generateData = function(){
  let data = {};

  //Filter fake pieces if necessary
  if((typeof GLOBAL_CONFIG.Mextra === "number")&&(typeof GLOBAL_CONFIG.Nextra === "number")){
    let solutionPieces = GLOBAL_CONFIG.M * GLOBAL_CONFIG.N;
    let maxFakePieces = GLOBAL_CONFIG.Mextra * GLOBAL_CONFIG.Nextra;
    let nPieces = generatedPieces.length;
    if(nPieces > (solutionPieces+maxFakePieces)){
      removeFakePieces(nPieces - (solutionPieces+maxFakePieces));
    }
  }

  //Save pieces
  data["pieces"] = shuffle(generatedPieces);

  console.log("Solucion: " + solution);
  //Save cyphered solution
  data["solution"] = MD5(solution).toString();

  console.log("Data generated by crop");
  console.log(JSON.stringify(data, null, "  "));

  const dataDestPath = resolve(__dirname, '../app/config/data_generated_by_crop.json');
  fs.writeFileSync(dataDestPath, JSON.stringify(data, null, "  "));
}

removeFakePieces = function(n){
  let nFakePieces = generatedPieces.length - (GLOBAL_CONFIG.M * GLOBAL_CONFIG.N);
  if(nFakePieces > 0){
    let indexToDelete = ((GLOBAL_CONFIG.M * GLOBAL_CONFIG.N)-1) + getRandomInt(1, nFakePieces);
    removePiece(indexToDelete);
    if(n>1){
      return removeFakePieces(n-1);
    } else {
      return true;
    }
  }
}

removePiece = function(index){
  let pieceToRemove = generatedPieces[index];
  removePieceImg(pieceToRemove.face);
  if(typeof pieceToRemove.reverse !== "undefined"){
    removePieceImg(pieceToRemove.reverse);
  }

  generatedPieces.splice(index, 1);
}

removePieceImg = function(pieceImg){
  let imgPath = resolve(__dirname, pieceImg.path.replace('./assets/images/crop/','../app/assets/images/crop/'));
  fs.unlinkSync(imgPath);
}

getRandomInt = function(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

cropNextImage(function(){
  generateData();
  console.log("\n\n Crop finished");
});
