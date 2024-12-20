package com.poemes.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poemes.dto.CreatePoemPayload;
import com.poemes.models.Author;
import com.poemes.models.Poem;
import com.poemes.repositories.PoemRepository;

@Service
public class PoemService {

  @Autowired
  private PoemRepository poemRepository;

  public List<Poem> getAllPoems() {
    return poemRepository.findAll();
  }

  public List<Poem> getPoemsByAuthorId(Long authorId) {
    return poemRepository.findByAuthorId(authorId);
  }

  public Poem getPoemById(Long id) {
    return poemRepository.findById(id).orElse(null);
  }

  public Poem createPoem(CreatePoemPayload poem) {
    Poem newPoem = new Poem();
    newPoem.setTitle(poem.getTitle());
    newPoem.setContent(poem.getContent());

    Author author = new Author();
    author.setId(poem.getAuthorId());

    newPoem.setAuthor(author);
    newPoem.setDate(poem.getDate());
    return poemRepository.save(newPoem);
  }

  public Poem updatePoem(Long id, CreatePoemPayload poem) {
    Poem existingPoem = getPoemById(id);
    if (existingPoem != null) {
      existingPoem.setTitle(poem.getTitle());
      existingPoem.setContent(poem.getContent());

      Author author = new Author();
      author.setId(poem.getAuthorId());
      existingPoem.setAuthor(author);

      return poemRepository.save(existingPoem);
    }
    return null;
  }

  public void deletePoem(Long id) {
    poemRepository.deleteById(id);
  }

  public boolean existsById(Long id) {
    return poemRepository.existsById(id);
  }
}
