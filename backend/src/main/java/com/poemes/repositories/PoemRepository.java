package com.poemes.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.poemes.models.Poem;

@Repository
public interface PoemRepository extends JpaRepository<Poem, Long> {
    
    @Query("SELECT COUNT(DISTINCT p.author.id) FROM Poem p WHERE p.date >= :since")
    long countActiveAuthors(LocalDateTime since);
    
    @Query("SELECT COUNT(p) FROM Poem p WHERE p.date >= :since")
    long countPoemsAfter(LocalDateTime since);
    
    @Query("SELECT COUNT(p) FROM Poem p WHERE p.date BETWEEN :start AND :end")
    long countPoemsBetween(LocalDateTime start, LocalDateTime end);
    
    Poem findTopByOrderByDateDesc();
    
    List<Poem> findTop10ByOrderByDateDesc();
    
    @Query("SELECT p.date as date, COUNT(p) as count FROM Poem p " +
           "WHERE p.date >= :since GROUP BY DATE(p.date) ORDER BY p.date DESC")
    List<Object[]> findDailyActivityLastMonth(LocalDateTime since);
    
    List<Poem> findByAuthorId(Long authorId);
}
