import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';

const CATEGORIAS = [
  { id: '1', nombre: 'Pasteles y Tortas', icon: '🎂' },
  { id: '2', nombre: 'Cupcakes y Muffins', icon: '🧁' },
  { id: '3', nombre: 'Galletas Artesanales', icon: '🍪' },
  { id: '4', nombre: 'Postres Fríos', icon: '🍮' },
  { id: '5', nombre: 'Panadería Dulce', icon: '🥐' },
  { id: '6', nombre: 'Tartas y Pies', icon: '🥧' },
];

export default function App() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [stock, setStock] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [exito, setExito] = useState<any>(null);

  const [productos, setProductos] = useState([
    {
      id: 'p1',
      nombre: 'Torta Red Velvet 20cm',
      precio: '45.00',
      categoria: 'Pasteles y Tortas',
      stock: '8',
      descripcion: 'Deliciosa torta de terciopelo rojo con cobertura de queso crema.',
    },
    {
      id: 'p2',
      nombre: 'Cupcake de Arándanos',
      precio: '6.50',
      categoria: 'Cupcakes y Muffins',
      stock: '24',
      descripcion: 'Cupcake esponjoso relleno de mermelada artesanal de arándanos.',
    },
  ]);

  const validarFormulario = () => {
    const nuevosErrores: { [key: string]: string } = {};

    if (!nombre.trim()) {
      nuevosErrores.nombre = '⚠️ El nombre del producto es obligatorio.';
    } else if (nombre.trim().length < 3) {
      nuevosErrores.nombre = '⚠️ El nombre debe tener al menos 3 caracteres.';
    }

    if (!precio.trim()) {
      nuevosErrores.precio = '⚠️ El precio es obligatorio.';
    } else {
      const precioNum = parseFloat(precio);
      if (isNaN(precioNum) || precioNum <= 0) {
        nuevosErrores.precio = '⚠️ Ingrese un precio válido mayor a 0 (Ej: 25.50).';
      }
    }

    if (!categoria) {
      nuevosErrores.categoria = '⚠️ Seleccione una categoría para el producto.';
    }

    if (!stock.trim()) {
      nuevosErrores.stock = '⚠️ El stock es obligatorio.';
    } else {
      const stockNum = Number(stock);
      if (isNaN(stockNum) || !Number.isInteger(stockNum) || stockNum < 0) {
        nuevosErrores.stock = '⚠️ El stock debe ser un número entero mayor o igual a 0.';
      }
    }

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = () => {
    setExito(null);

    if (validarFormulario()) {
      const nuevoProducto = {
        id: Date.now().toString(),
        nombre: nombre.trim(),
        precio: parseFloat(precio).toFixed(2),
        categoria,
        stock: parseInt(stock, 10).toString(),
        descripcion: descripcion.trim(),
      };

      setProductos([nuevoProducto, ...productos]);

      setExito({
        mensaje: '¡Producto registrado con éxito en el catálogo!',
        producto: nuevoProducto,
      });

      limpiarCampos();
    }
  };

  const limpiarCampos = () => {
    setNombre('');
    setPrecio('');
    setCategoria('');
    setStock('');
    setDescripcion('');
    setErrors({});
  };

  const handleNombreChange = (text: string) => {
    setNombre(text);
    if (errors.nombre && text.trim().length >= 3) {
      setErrors((prev) => ({ ...prev, nombre: null }));
    }
  };

  const handlePrecioChange = (text: string) => {
    setPrecio(text);
    if (errors.precio) {
      const num = parseFloat(text);
      if (!isNaN(num) && num > 0) {
        setErrors((prev) => ({ ...prev, precio: null }));
      }
    }
  };

  const handleStockChange = (text: string) => {
    setStock(text);
    if (errors.stock) {
      const num = Number(text);
      if (!isNaN(num) && Number.isInteger(num) && num >= 0) {
        setErrors((prev) => ({ ...prev, stock: null }));
      }
    }
  };

  const handleSelectCategoria = (catNombre: string) => {
    setCategoria(catNombre);
    if (errors.categoria) {
      setErrors((prev) => ({ ...prev, categoria: null }));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FDF8F5" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER PRINCIPAL DE LA PASTELERÍA */}
          <View style={styles.header}>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeIcon}>🧁</Text>
            </View>
            <Text style={styles.headerSub}>PASTELERÍA ARTESANAL</Text>
            <Text style={styles.headerTitle}>Registro de Producto</Text>
            <Text style={styles.headerDescription}>
              Complete el formulario para ingresar un nuevo dulce o pastel al inventario local.
            </Text>
          </View>

          {/* MENSAJE DESTACADO DE ÉXITO */}
          {exito && (
            <View style={styles.successCard}>
              <View style={styles.successHeader}>
                <Text style={styles.successIcon}>🎉</Text>
                <Text style={styles.successTitle}>{exito.mensaje}</Text>
              </View>
              <View style={styles.successDetails}>
                <Text style={styles.successText}>
                  • <Text style={styles.bold}>Producto:</Text> {exito.producto.nombre}
                </Text>
                <Text style={styles.successText}>
                  • <Text style={styles.bold}>Precio:</Text> S/. {exito.producto.precio}
                </Text>
                <Text style={styles.successText}>
                  • <Text style={styles.bold}>Categoría:</Text> {exito.producto.categoria}
                </Text>
                <Text style={styles.successText}>
                  • <Text style={styles.bold}>Stock Disponible:</Text> {exito.producto.stock} unidades
                </Text>
              </View>
              <Pressable
                style={styles.closeSuccessButton}
                onPress={() => setExito(null)}
              >
                <Text style={styles.closeSuccessText}>Cerrar Notificación</Text>
              </Pressable>
            </View>
          )}

          {/* TARJETA DEL FORMULARIO */}
          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Datos del Producto</Text>

            {/* CAMPO 1: NOMBRE DEL PRODUCTO */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Nombre del Producto <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.input,
                  errors.nombre ? styles.inputError : null,
                ]}
                placeholder="Ej. Cheesecake de Frutos Rojos"
                placeholderTextColor="#A09893"
                value={nombre}
                onChangeText={handleNombreChange}
              />
              {errors.nombre && (
                <Text style={styles.errorText}>{errors.nombre}</Text>
              )}
            </View>

            {/* CAMPO 2: PRECIO (S/.) */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Precio (S/.) <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.input,
                  errors.precio ? styles.inputError : null,
                ]}
                placeholder="Ej. 38.50"
                placeholderTextColor="#A09893"
                keyboardType="decimal-pad"
                value={precio}
                onChangeText={handlePrecioChange}
              />
              {errors.precio && (
                <Text style={styles.errorText}>{errors.precio}</Text>
              )}
            </View>

            {/* CAMPO 3: CATEGORÍA */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Categoría <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.categoryContainer}>
                {CATEGORIAS.map((cat) => {
                  const selected = categoria === cat.nombre;
                  return (
                    <Pressable
                      key={cat.id}
                      style={[
                        styles.categoryChip,
                        selected ? styles.categoryChipSelected : null,
                      ]}
                      onPress={() => handleSelectCategoria(cat.nombre)}
                    >
                      <Text style={styles.chipIcon}>{cat.icon}</Text>
                      <Text
                        style={[
                          styles.chipText,
                          selected ? styles.chipTextSelected : null,
                        ]}
                      >
                        {cat.nombre}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              {errors.categoria && (
                <Text style={styles.errorText}>{errors.categoria}</Text>
              )}
            </View>

            {/* CAMPO 4: STOCK */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Stock Disponible (Unidades) <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.input,
                  errors.stock ? styles.inputError : null,
                ]}
                placeholder="Ej. 15"
                placeholderTextColor="#A09893"
                keyboardType="number-pad"
                value={stock}
                onChangeText={handleStockChange}
              />
              {errors.stock && (
                <Text style={styles.errorText}>{errors.stock}</Text>
              )}
            </View>

            {/* CAMPO OPCIONAL: DESCRIPCIÓN */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Descripción o Notas (Opcional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Ej. Pastel artesanal libre de gluten..."
                placeholderTextColor="#A09893"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                value={descripcion}
                onChangeText={setDescripcion}
              />
            </View>

            {/* BOTONES DE ACCIÓN */}
            <View style={styles.buttonRow}>
              <Pressable
                style={({ pressed }) => [
                  styles.submitButton,
                  pressed ? styles.buttonPressed : null,
                ]}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>✨ Registrar Producto</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.resetButton,
                  pressed ? styles.buttonPressed : null,
                ]}
                onPress={limpiarCampos}
              >
                <Text style={styles.resetButtonText}>Limpiar</Text>
              </Pressable>
            </View>
          </View>

          {/* LISTADO DE PRODUCTOS REGISTRADOS */}
          <View style={styles.listSection}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>Inventario Actual</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{productos.length} ítems</Text>
              </View>
            </View>

            {productos.map((prod) => (
              <View key={prod.id} style={styles.productCard}>
                <View style={styles.productCardHeader}>
                  <Text style={styles.productName}>{prod.nombre}</Text>
                  <Text style={styles.productPrice}>S/. {prod.precio}</Text>
                </View>
                <View style={styles.productDetailsRow}>
                  <View style={styles.tagCategory}>
                    <Text style={styles.tagCategoryText}>{prod.categoria}</Text>
                  </View>
                  <Text style={styles.productStock}>Stock: {prod.stock} unids.</Text>
                </View>
                {prod.descripcion ? (
                  <Text style={styles.productDesc}>{prod.descripcion}</Text>
                ) : null}
              </View>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FDF8F5',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 24 : 12,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  badgeContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFEBF0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#C2185B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  badgeIcon: {
    fontSize: 32,
  },
  headerSub: {
    fontSize: 12,
    fontWeight: '800',
    color: '#D81B60',
    letterSpacing: 2,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3E2723',
    marginBottom: 6,
  },
  headerDescription: {
    fontSize: 14,
    color: '#6D4C41',
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 20,
  },
  successCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#4CAF50',
    marginBottom: 20,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  successHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  successIcon: {
    fontSize: 22,
    marginRight: 8,
  },
  successTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    flex: 1,
  },
  successDetails: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginVertical: 6,
  },
  successText: {
    fontSize: 14,
    color: '#2E7D32',
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  closeSuccessButton: {
    alignSelf: 'flex-end',
    marginTop: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  closeSuccessText: {
    fontSize: 13,
    color: '#1B5E20',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#3E2723',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3E2723',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3E5F5',
    paddingBottom: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4E342E',
    marginBottom: 6,
  },
  required: {
    color: '#D32F2F',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#3E2723',
  },
  inputError: {
    borderColor: '#D32F2F',
    backgroundColor: '#FFEBEE',
  },
  textArea: {
    height: 80,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 13,
    marginTop: 5,
    fontWeight: '500',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  categoryChipSelected: {
    backgroundColor: '#FCE4EC',
    borderColor: '#D81B60',
  },
  chipIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  chipText: {
    fontSize: 13,
    color: '#616161',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#C2185B',
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'column',
    gap: 10,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#D81B60',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#D81B60',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  resetButtonText: {
    color: '#757575',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  listSection: {
    marginTop: 8,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E2723',
  },
  countBadge: {
    backgroundColor: '#E0F2F1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00796B',
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#D81B60',
  },
  productCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E2723',
    flex: 1,
    marginRight: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D81B60',
  },
  productDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  tagCategory: {
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  tagCategoryText: {
    fontSize: 12,
    color: '#7B1FA2',
    fontWeight: '600',
  },
  productStock: {
    fontSize: 13,
    color: '#616161',
    fontWeight: '500',
  },
  productDesc: {
    fontSize: 13,
    color: '#757575',
    marginTop: 8,
    fontStyle: 'italic',
  },
});