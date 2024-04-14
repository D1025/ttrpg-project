package com.ttrpg.project.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PageUtils {

    public Pageable getPageable(Integer page, Integer size) {

        return PageRequest.of(page, Math.min(size, 10));
    }
}
