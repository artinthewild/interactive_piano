const myPiano = new Promise((resolve,reject) => {
    const nKeys = 5;
    const width = 1225;
    const height = 150;
    const bWidth=10;
    const wWidth=22;
    const bHeight = 100;
    const wHeight = height;
    const bColour = "#121212";
    const wColour = "#FFF";

    let svg = d3.select("#piano")
        .append("svg").attr("width", width).attr("height", height);
    
    d3.json("./data/keys.json").then(function(data) {
        let keyData = d3.range(data.length-1);
        for(let key of data){
            //console.log(key.position);
            keyData[key.position] = key;
        }
        return keyData;
    }).then(function(keyData) {
        console.log(keyData);
        let offset = 0;
        svg.append("g").selectAll("rect")
        .data(keyData)
        .enter()
        .append("rect")
        .attr("x",function(d,i){
            //console.log(d);
            //console.log(i);
            if(d.colour==="b"){
                //offset += d.position * bWidth 
                return offset + wWidth - (bWidth/2);
            } else {
                //console.log("In: " + offset);
                if(i>0){
                    offset += wWidth;
                }
                //console.log("Out: " + offset);
                return offset;
            }
            
        })
        .attr("y",0)
        .attr("width",function(d,i){
            if(d.colour==="b"){
                return bWidth;
            } else {
                return wWidth;
            }
        })
        .attr("height",function(d,i){
            if(d.colour==="b"){
                return bHeight;
            } else {
                return wHeight;
            }
        })
        .attr("class", function(d,i){
            if(d.colour==="b"){
                d3.select(this).raise(); 
                return "key blackKey";
            } else {
                return "key whiteKey";
            }
        })
        .attr("id",function(d,i){
            return d.names[0];
        })
        .append("text")
        .attr("x",function(d,i){
            //console.log(d);
            //console.log(i);
            if(d.colour==="b"){
                //offset += d.position * bWidth 
                return offset + wWidth - (bWidth/2);
            } else {
                //console.log("In: " + offset);
                if(i>0){
                    offset += wWidth;
                }
                //console.log("Out: " + offset);
                return offset;
            }
            
        })
        .attr("y",20)
        .attr("dy", ".35em")
        .text(function(d) { return d.names[0]; });
    }).then(
        (svg) => { resolve(svg) }
    );

    
});

function init(){
    let myChord = ['C3','E3','G3'];
    myPiano.then(
        (res)=>{
            console.log(res)
            for(key of myChord){
                d3.select("#"+key).classed("key highlightKey", true);
            }
            
        }
    );
}

window.onload = function() {
    init();
};

  