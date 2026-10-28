// MODEL DE PRODUCTOS: el catalogo
const supabase = require('../config/supabaseClient');

// Las categorias para el filtro del front (ya resuelto)
async function obtenerCategorias() {
  const { data, error } = await supabase
    .from('categorias')
    .select('id, nombre')
    .order('nombre');
  if (error) throw error;
  return data;
}

// Los productos activos, con el nombre de su categoria.
// Si llega categoriaId, filtra por esa categoria.
async function obtenerProductos(categoriaId) {
  const columnas = 'id, nombre, descripcion, precio, stock,' +
                   ' imagen_url, categorias(nombre)';
  let consulta = supabase
    .from('productos')
    .select(columnas)
    .eq('activo', true)
    .order('nombre');

  if (categoriaId) {
    consulta = consulta.eq('categoria_id', categoriaId);   // filtro opcional
  }

  const { data, error } = await consulta;
  if (error) throw error;
  return data;
}

// Un solo producto por su id, o null si no existe (para la pag de detalle)
async function obtenerProducto(id) {
  const columnas = 'id, nombre, descripcion, precio, stock, activo,' +
                   ' imagen_url, categorias(nombre)';
  const { data, error } = await supabase
    .from('productos')
    .select(columnas)
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

module.exports = { obtenerCategorias, obtenerProductos, obtenerProducto };
