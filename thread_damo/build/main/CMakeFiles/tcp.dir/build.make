# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.10

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:


#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:


# Remove some rules from gmake that .SUFFIXES does not remove.
SUFFIXES =

.SUFFIXES: .hpux_make_needs_suffix_list


# Suppress display of executed commands.
$(VERBOSE).SILENT:


# A target that is always out of date.
cmake_force:

.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E remove -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/jiafeng/jiafeng/Linux/thread/thread_damo

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/jiafeng/jiafeng/Linux/thread/thread_damo/build

# Include any dependencies generated for this target.
include main/CMakeFiles/tcp.dir/depend.make

# Include the progress variables for this target.
include main/CMakeFiles/tcp.dir/progress.make

# Include the compile flags for this target's objects.
include main/CMakeFiles/tcp.dir/flags.make

main/CMakeFiles/tcp.dir/main.c.o: main/CMakeFiles/tcp.dir/flags.make
main/CMakeFiles/tcp.dir/main.c.o: ../main/main.c
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/jiafeng/jiafeng/Linux/thread/thread_damo/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building C object main/CMakeFiles/tcp.dir/main.c.o"
	cd /home/jiafeng/jiafeng/Linux/thread/thread_damo/build/main && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -o CMakeFiles/tcp.dir/main.c.o   -c /home/jiafeng/jiafeng/Linux/thread/thread_damo/main/main.c

main/CMakeFiles/tcp.dir/main.c.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing C source to CMakeFiles/tcp.dir/main.c.i"
	cd /home/jiafeng/jiafeng/Linux/thread/thread_damo/build/main && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -E /home/jiafeng/jiafeng/Linux/thread/thread_damo/main/main.c > CMakeFiles/tcp.dir/main.c.i

main/CMakeFiles/tcp.dir/main.c.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling C source to assembly CMakeFiles/tcp.dir/main.c.s"
	cd /home/jiafeng/jiafeng/Linux/thread/thread_damo/build/main && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -S /home/jiafeng/jiafeng/Linux/thread/thread_damo/main/main.c -o CMakeFiles/tcp.dir/main.c.s

main/CMakeFiles/tcp.dir/main.c.o.requires:

.PHONY : main/CMakeFiles/tcp.dir/main.c.o.requires

main/CMakeFiles/tcp.dir/main.c.o.provides: main/CMakeFiles/tcp.dir/main.c.o.requires
	$(MAKE) -f main/CMakeFiles/tcp.dir/build.make main/CMakeFiles/tcp.dir/main.c.o.provides.build
.PHONY : main/CMakeFiles/tcp.dir/main.c.o.provides

main/CMakeFiles/tcp.dir/main.c.o.provides.build: main/CMakeFiles/tcp.dir/main.c.o


# Object files for target tcp
tcp_OBJECTS = \
"CMakeFiles/tcp.dir/main.c.o"

# External object files for target tcp
tcp_EXTERNAL_OBJECTS =

main/tcp: main/CMakeFiles/tcp.dir/main.c.o
main/tcp: main/CMakeFiles/tcp.dir/build.make
main/tcp: src/libdh_rtmp.a
main/tcp: main/CMakeFiles/tcp.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/jiafeng/jiafeng/Linux/thread/thread_damo/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking C executable tcp"
	cd /home/jiafeng/jiafeng/Linux/thread/thread_damo/build/main && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/tcp.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
main/CMakeFiles/tcp.dir/build: main/tcp

.PHONY : main/CMakeFiles/tcp.dir/build

main/CMakeFiles/tcp.dir/requires: main/CMakeFiles/tcp.dir/main.c.o.requires

.PHONY : main/CMakeFiles/tcp.dir/requires

main/CMakeFiles/tcp.dir/clean:
	cd /home/jiafeng/jiafeng/Linux/thread/thread_damo/build/main && $(CMAKE_COMMAND) -P CMakeFiles/tcp.dir/cmake_clean.cmake
.PHONY : main/CMakeFiles/tcp.dir/clean

main/CMakeFiles/tcp.dir/depend:
	cd /home/jiafeng/jiafeng/Linux/thread/thread_damo/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/jiafeng/jiafeng/Linux/thread/thread_damo /home/jiafeng/jiafeng/Linux/thread/thread_damo/main /home/jiafeng/jiafeng/Linux/thread/thread_damo/build /home/jiafeng/jiafeng/Linux/thread/thread_damo/build/main /home/jiafeng/jiafeng/Linux/thread/thread_damo/build/main/CMakeFiles/tcp.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : main/CMakeFiles/tcp.dir/depend

