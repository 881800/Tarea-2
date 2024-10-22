package com.project.demo.rest.producto;

import com.project.demo.logic.entity.categoria.Categoria;
import com.project.demo.logic.entity.http.GlobalResponseHandler;
import com.project.demo.logic.entity.http.Meta;
import com.project.demo.logic.entity.producto.Producto;
import com.project.demo.logic.entity.producto.ProductoRepository;
import com.project.demo.logic.service.CategoriaService;
import com.project.demo.logic.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

@RestController
@RequestMapping("/productos")
public class ProductoController {

    @Autowired
    private ProductoRepository productorepository;
    @Autowired
    private ProductoService productoService;
    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public ResponseEntity<?> getAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            HttpServletRequest request) {

        Pageable pageable = PageRequest.of(page-1, size);
        Page<Producto> productosPage = productorepository.findAll(pageable);
        Meta meta = new Meta(request.getMethod(), request.getRequestURL().toString());
        meta.setTotalPages(productosPage.getTotalPages());
        meta.setTotalElements(productosPage.getTotalElements());
        meta.setPageNumber(productosPage.getNumber() + 1);
        meta.setPageSize(productosPage.getSize());

        return new GlobalResponseHandler().handleResponse("Producto retrieved successfully",
                productosPage.getContent(), HttpStatus.OK, meta);
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @PostMapping
    public Producto createProducto(@RequestBody Producto producto) {
        Categoria categoria = categoriaService.findById(producto.getCategoria().getId());
        producto.setCategoria(categoria);
        return productoService.save(producto);
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Producto> updateProducto(@PathVariable Long id, @RequestBody Producto producto) {
        Producto existingProducto = productoService.findById(id);
        if (existingProducto == null) {
            return ResponseEntity.notFound().build();
        }
        producto.setId(id);
        return ResponseEntity.ok(productorepository.save(producto));
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long id) {
        productorepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
