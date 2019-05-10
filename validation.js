class Validation {
    static validateUser(name, price) {

        return new Promise((resolve, reject) => {
            const productData = {
                name: name,
                price: price
            }
            if (typeof (productData.name) === "string" && typeof (productData.price) === "number") {
                const keys = Object.keys(productData);  // ["name" ,"price"]
                
                for (var i = 0; i < keys.length; i++) {
                    if (productData[keys[i]] === "") {
                        this.validate = true;           // 'this' importance
                        this.fieldName = keys[i];
                        break;
                    } else {
                        this.validate = false;
                    }
                }
                if (this.validate === true) {
                    reject({ errorMsg: this.fieldName + " can not be empty!" });
                } else {
                    resolve(productData)
                }
            } else {
                if(price == null || name == null){
                    reject({msg: "Please Provide All Fields"})
                }else{ 
                    reject({ msg: "Please Check Your Datatype" });
                }
            }
        })
    }

    
    static updateValidation(requestBody){
        return new Promise((resolve, reject)=>{
            let newObj = {}
            let propertyData = [{name: "product_name",type: "string"},
            {name: "price",type: "number"}] //[{name: "product_name",type: "string"}]
            let wrongPropertyMsg = false;
            for (const ops of requestBody){
                for(const el of propertyData){
                    if(ops.property === el.name){
                        if(typeof(ops.value) === el.type){
                            newObj[ops.property] = ops.value   
                            wrongPropertyMsg = true; 
                        }else{
                            reject({msg: "Check Values Datatype"})
                        }
                    }
                }
            }
            if(wrongPropertyMsg == false){
                reject({msg: "Wrong Property!!"})
            }else{
                resolve(newObj)
            }
        })
    }
}

module.exports = Validation