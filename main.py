"""
Main entry point for the Todo Console App
Task ID: T008
Implements the main CLI loop with input parsing.
"""
from services.cli_service import CLIService


def main():
    """
    Main application loop that handles user input and commands.
    """
    print("Welcome to the Todo Console App!")
    print("Type 'help' for available commands or 'exit' to quit.")
    print()

    cli_service = CLIService()

    while True:
        try:
            # Task ID: T018 [US1] (clear CLI prompts)
            command = input("todo> ").strip()

            # Task ID: T040 (exit command)
            if command.lower() in ['exit', 'quit']:
                print("Goodbye!")
                break

            # Process the command
            result = cli_service.handle_command(command)
            print(result)
            print()

        except KeyboardInterrupt:
            # Task ID: T041 (proper exit flow)
            print("\nGoodbye!")
            break
        except EOFError:
            # Handle Ctrl+D (EOF)
            print("\nGoodbye!")
            break


if __name__ == "__main__":
    main()