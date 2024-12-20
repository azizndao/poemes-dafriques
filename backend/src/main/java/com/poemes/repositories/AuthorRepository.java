package com.poemes.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.poemes.models.Author;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    
    @Query("SELECT a, COUNT(p) as poemCount, MAX(p.date) as lastPublished " +
           "FROM Author a LEFT JOIN a.poems p " +
           "GROUP BY a ORDER BY COUNT(p) DESC LIMIT 10")
    List<Object[]> findTopAuthors();
}
