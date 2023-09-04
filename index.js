class Producto{
    constructor(nombre, categoria, precio, stock){
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock;
    }

    mostrarProducto(){
        console.log("Nombre: "+this.nombre +"\nCategoria: "+this.categoria + "\nPrecio: $" +this.precio+ "\nCantidad disponible: "+this.stock);
        //alert("Nombre: "+this.nombre +"\nCategoria: "+this.categoria + "\nPrecio: $" +this.precio+ "\nCantidad disponible: "+this.stock);
    }

    venderProducto(cantidad){
        this.stock -= cantidad;
    }
}

function Dividir(divisor, dividendo){
    retorno = 0;
    if(divisor != 0){
        retorno = dividendo / divisor;
    }
    return retorno;
}

function Validar(menor, mayor, valor){
    retorno = true;
    if((valor<menor || valor>mayor) || isNaN(valor)){
        retorno = false;
    }
    return retorno;
}

function ModificarStock(productos){
    let seguir = 1;
    do{
        let opcion = parseInt(prompt('1-Agregar Producto\n2-Eliminar Producto'));
        while(Validar(1, 2, opcion) == false){
            opcion = parseInt(prompt('INGRESE UNA OPCIÓN VÁLIDA\n1-Agregar Producto\n2-Eliminar Producto'));
        }

        switch(opcion){
            case 1:
                console.table(productos);
                let prod = prompt("Ingrese el nombre del producto: ");
                let indice = -1;
                for(const elem of productos){
                    if(elem.nombre == prod){
                        indice = productos.indexOf(elem);
                        break;
                    }
                } 

                if(indice > -1){
                    let cantidad = parseInt(prompt('¿Cuántas unidades desea agregar?'));
                    productos[indice].stock += cantidad;
                }
                else{
                    let cont = parseInt(prompt('Usted está a punto de ingresar un nuevo producto. ¿Desea continuar? 1-Si | 2-No'));
                    if(cont == 1){
                        let nombre = prompt('Ingrese el nombre del producto');
                        let categoria = prompt('Ingrese la categoría del producto');
                        let precio = parseFloat(prompt('Ingrese el precio del producto'));
                        let stock = parseInt(prompt('Ingrese la cantidad de unidades del producto'));
                        let producto = new Producto(nombre, categoria, precio, stock);
                        productos.push(producto); 
                    }else{
                        break;
                    }
                }
                break;
            
            case 2:
                console.table(productos);
                let indice1 = parseInt(prompt('Ingrese el índice del producto que desea eliminar: '));
                while(indice1 < 0){
                    indice1 = parseInt('ERROR! Ingrese un índice válido');
                }
                if (Validar(0, productos.length, indice1)){
                    let cant = parseInt(prompt('¿Cuántas unidades desea eliminar?'));
                    //chequear cant <= stock actual
                    while(cant > productos[indice1].stock){
                        cant = parseInt(prompt('¡No puede eliminar más productos de los que hay en stock!\n¿Cuántas unidades desea eliminar?'));
                    }
                    productos[indice1].venderProducto(cant);
                }
                break;
        }

        seguir = parseInt(prompt("¿Desea seguir modificando el stock? 1-Si | 2-No"));
        while(Validar(1, 2, seguir) == false){
            seguir = parseInt(prompt("INGRESE UNA OPCIÓN VÁLIDA\n¿Desea seguir modificando el stock? 1-Si | 2-No"));
        }

    }while(seguir == 1);
}//fin función ModificarStock

function Filtrar (productos, filtro){
     
    switch(filtro){
        case 1:
            let nombre = prompt('Ingrese el nombre del producto:');
            productos.forEach((prod) => {
                if(productos.includes(nombre)){
                    prod.mostrarProducto();
                }
            });
        break;

        case 2:
            let cate = prompt('Ingrese la categoría:');
            productos.forEach((prod) => {
                if(prod.categoria == cate){
                    prod.mostrarProducto();
                }
            });
        break;
 
        case 3:
            let precio = parseFloat(prompt('Ingrese el precio máximo:'));
            productos.forEach((prod) => {
                if(prod.precio <= precio){
                    prod.mostrarProducto();
                }
            });
        break;
    }
}

function AumentarPrecios (productos, porcentaje){
    let productosMod = productos.map((producto) => {
        return new Producto(producto.nombre, producto.categoria,producto.precio + (producto.precio * porcentaje / 100), producto.stock);        
    }) 

    return productosMod;
}

const producto1 = new Producto("homero buda", "los simpson", 1200, 15);
const producto2 = new Producto("baby yoda", "star wars", 900, 6);
const producto3 = new Producto("iron man", "marvel", 1500, 10);

let productos = [];

productos.push(producto1, producto2, producto3);

//MENÚ

let opcion = parseInt(prompt('1-Modificar Stock\n2-Aumentar Precios (15%)\n3-Mostrar Productos\n4-Filtrar\n5-Salir\nSeleccione una opción: '));
while (Validar(1, 5, opcion) == false){
    opcion = parseInt(prompt('"¡INGRESE UNA OPCIÓN VÁLIDA!"\n\n1-Modificar Stock\n2-Aumentar Precios (15%)\n3-Mostrar Productos\n4-Filtrar\n5-Salir\nSeleccione una opción: '));
}

while(opcion != 5){

    switch(opcion){

        case 1://modificar stock
            ModificarStock(productos);
            break;
            
        case 2://aumentar precios
            let porcentaje = parseFloat(prompt('Ingrese el porcentaje:'));
            productos = AumentarPrecios(productos, porcentaje);
            break;
        
        case 3://mostrar productos
            for(const prod of productos){
                prod.mostrarProducto();
            }
            break;

        case 4://filtrar por cantidad y categoria
            let filtro = parseInt(prompt("Filtrar por: 1-Nombre | 2-Categoría | 3-Precio")); 
            Filtrar(productos, filtro);
            break;    
    }
    
    opcion = parseInt(prompt('1-Modificar Stock\n2-Aumentar Precios (15%)\n3-Mostrar Productos\n4-Filtrar\n5-Salir\nSeleccione una opción: '));
    while (Validar(1, 5, opcion) == false){
        opcion = parseInt(prompt('"¡INGRESE UNA OPCIÓN VÁLIDA!"\n\n1-Modificar Stock\n2-Aumentar Precios (15%)\n3-Mostrar Productos\n4-Filtrar\n5-Salir\nSeleccione una opción: '));
    }
}
