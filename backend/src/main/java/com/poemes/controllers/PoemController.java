package com.poemes.controllers;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poemes.dto.CreatePoemPayload;
import com.poemes.models.Poem;
import com.poemes.services.PoemService;

@RestController
@RequestMapping("/api/poems")
@CrossOrigin
public class PoemController {

  private final Logger logger = Logger.getLogger(PoemController.class.getName());

  @Autowired
  private PoemService poemService;

  public PoemController(PoemService poemService) {
    this.poemService = poemService;
  }

  @GetMapping
  public List<Poem> getAllPoems() {
    List<Poem> allPoems = poemService.getAllPoems();
    return allPoems;
  }

  @GetMapping("/{id}")
  public Poem getPoemById(@PathVariable Long id) {
    return poemService.getPoemById(id);
  }

  @PostMapping
  public Poem createPoem(@RequestBody CreatePoemPayload poem) {
    logger.info("Creating a new poem" + poem.toString() + " by " + poem.getAuthorId());
    return poemService.createPoem(poem);
  }

  @PutMapping("/{id}")
  public Poem updatePoem(@PathVariable Long id, @RequestBody CreatePoemPayload poem) {
    logger.info("Updating poem with id " + id);
    return poemService.updatePoem(id, poem);
  }

  @DeleteMapping("/{id}")
  public void deletePoem(@PathVariable Long id) {
    poemService.deletePoem(id);
  }

  @GetMapping("/author/{authorId}")
  public List<Poem> getPoemsByAuthorId(@PathVariable Long authorId) {
    return poemService.getPoemsByAuthorId(authorId);
  }
}
