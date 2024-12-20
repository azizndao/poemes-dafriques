package com.poemes.dto;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreatePoemPayload {
  private String title;
  private String content;
  private Long authorId;
  private LocalDate date;
}
