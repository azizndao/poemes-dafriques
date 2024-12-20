package com.poemes.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poemes.models.Author;
import com.poemes.repositories.AuthorRepository;

@Service
public class AuthorService {

  @Autowired
  private AuthorRepository authorRepository;

  public List<Author> getAllAuthors() {
    return authorRepository.findAll();
  }

  public Author getAuthorById(Long id) {
    return authorRepository.findById(id)
        .orElse(null);
  }

  public Author createAuthor(Author author) {
    return authorRepository.save(author);
  }

  public Author updateAuthor(Long id, Author author) {
    Author existingAuthor = authorRepository.findById(id).orElse(null);
    if (existingAuthor != null) {
      existingAuthor.setFirstName(author.getFirstName());
      existingAuthor.setLastName(author.getLastName());
      return authorRepository.save(existingAuthor);
    }
    return null;
  }

  public void deleteAuthor(Long id) {
    authorRepository.deleteById(id);
  }

  public boolean existsById(Long id) {
    return authorRepository.existsById(id);
  }
}
