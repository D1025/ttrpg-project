package com.ttrpg.project.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PageUtils {

    public Pageable getPageable(Integer pageNumber, Integer size) {

        return PageRequest.of(pageNumber, Math.min(size, 10));
    }
}
