const { Categoria, Usuario, Producto } = require('../models');
const Role = require('../models/role');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`)
    }
}

const existeEmail = async(correo = '') => {
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`)
    }
}

const existeUsuarioPorId = async( id ) => {
    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById( id );
    if ( !existeUsuario ) {
        throw new Error(`El id: ${ id }, no existe`)
    }
}

/**
 * Categorias
 * */ 
const existeCategoriaPorId = async( id ) => {
    // Verificar si la categoria existe
    const existeCategoria = await Categoria.findById( id );
    if ( !existeCategoria ) {
        throw new Error(`La categoria con el id: ${ id }, no existe`)
    }
}

/**
 * Productos
 * */ 
const existeProductoPorId = async( id ) => {
    // Verificar si el id del producto existe
    const existeProducto = await Producto.findById( id );
    if ( !existeProducto ) {
        throw new Error(`El producto con el id: ${ id }, no existe`)
    }
}
const existeProductoPorNombre = async( nombre ) => {
    const nombreNuevo = nombre.toUpperCase();
    // Verificar si el nombre del producto existe
    const existeProducto = await Producto.findOne({ nombre: nombreNuevo });
    if ( existeProducto ) {
        throw new Error(`El producto con el nombre: ${ nombre }, ya existe`)
    }
}

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes( coleccion );
    if ( !incluida ) {
        throw new Error(`La colección ${ coleccion } no es permitida - ${ colecciones }`);
    }

    return true;

}


module.exports = {
    coleccionesPermitidas,
    esRoleValido,
    existeEmail,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    existeProductoPorNombre,
}