package io.github.douglasfps.vendasapi.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.douglasfps.vendasapi.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long>{
	
}
