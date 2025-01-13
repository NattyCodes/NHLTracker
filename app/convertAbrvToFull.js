const convertAbrvToFull = (abrv) => {
    let fullName= ""
    switch(abrv){
        case("ANA"): {
            fullName = "Anaheim Ducks";
            break;
        }
        case("BOS"): {
            fullName = "Boston Bruins";
            break;
        }
        case("BUF"): {
            fullName = "Buffalo Sabers";
            break;
        }
        case("CAR"): {
            fullName = "Carolina Hurricanes";
            break;
        }
        case("CBJ"): {
            fullName = "Columbus Blue Jackets";
            break;
        }
        case("CGY"): {
            fullName = "Calgary Flames";
            break;
        }
    }
    return fullName;
}

export default convertAbrvToFull;