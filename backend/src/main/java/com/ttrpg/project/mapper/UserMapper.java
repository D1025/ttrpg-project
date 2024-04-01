package com.ttrpg.project.mapper;

import com.ttrpg.project.dto.PublicUserReturnDTO;
import com.ttrpg.project.dto.UserReturnDTO;
import com.ttrpg.project.model.Users;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserReturnDTO userToUserReturnDTO(Users user);

    List<UserReturnDTO> usersToUserReturnDTOs(List<Users> users);

    List<PublicUserReturnDTO> usersToPublicUserReturnDTOs(List<Users> users);

    PublicUserReturnDTO userToPublicUserReturnDTO(Users user);
}
