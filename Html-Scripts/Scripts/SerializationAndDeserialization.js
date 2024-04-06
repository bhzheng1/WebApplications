		//使用javascript做Serialization and Deserialization
        //create model object
        var product1 = {id:101,name:"read apple",price:1.99};

        //Serialize JavaScript object to JSON string
        var jsonString = JSON.stringify(product1);
        document.write(jsonString);
        document.write("<br/>");

        //Deserialize the json string back to model object
        var str = '{"id":101,"name":"read apple","price":1.99}';
        var product2=JSON.parse(str);
        document.write("Product ID: "+ product2.id + "<br/>");
        document.write("Product name: "+ product2.name + "<br/>");
        document.write("Product price: "+ product2.price + "<br/>");

        //serialize array to json
        var rockets = [
                        {ID: 0, Builder: "NASA", Target: "Moon", Speed: 7.8},
                        {ID: 1, Builder: "NASA", Target: "Mars", Speed: 17.8},
                        {ID: 2, Builder: "NASA", Target: "Kepler-452b", Speed: 57.8},
                        {ID: 3, Builder: "NASA", Target: "N/A", Speed: 0.0}
					];

        var jsonStr = JSON.stringify(rockets);
        document.write(jsonStr);
        document.write('<br/>');
        document.write("==============================");
        document.write('<br/>');
        
        //deserialize array to object
        var objects = JSON.parse(jsonStr);
        for (var i in objects) {
            document.write("ID: " + objects[i].ID + " Builder: " + objects[i].Builder + " Target: " + objects[i].Target + " Speed: " + objects[i].Speed);
            document.write('<br/>');
        }

