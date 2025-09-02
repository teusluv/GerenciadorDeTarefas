package back;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
  
  public class GerenciadorDeTarefas {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Tarefa> tarefas = new ArrayList<>();
        int proximoId = 1;
        while (true) {
            System.out.println("\ngerenciador de Tarefas");
            System.out.println("1. adicionar Tarefa");
            System.out.println("2. listar Tarefas");
            System.out.println("3. marcar Tarefa como Concluída");
            System.out.println("4. sair");
            System.out.print("escolha uma opção: ");
            int opcao = scanner.nextInt();
            scanner.nextLine(); // Consumir a nova linha
            if (opcao == 1) {
                System.out.print("descrição da tarefa: ");
                String descricao = scanner.nextLine();
                Tarefa tarefa = new Tarefa(proximoId++, descricao);
                tarefas.add(tarefa);
                System.out.println("tarefa adicionada.");
            } else if (opcao == 2) {
                System.out.println("\nlista de Tarefas:");
                for (Tarefa tarefa : tarefas) {
                    System.out.println(tarefa);
                }
            } else if (opcao == 3) {
                System.out.print("ID da tarefa a ser marcada como concluída: ");
                int id = scanner.nextInt();
                boolean encontrada = false;
                for (Tarefa tarefa : tarefas) {
                    if (tarefa.getId() == id) {
                        tarefa.setConcluida(true);
                        encontrada = true;
                        System.out.println("tarefa marcada como concluída.");
                        break;
                    }
                }
                if (!encontrada) {
                    System.out.println("tarefa não encontrada.");
                }
            } else if (opcao == 4) {
                System.out.println("saindo...");
                break;
            } else {
                System.out.println("opção inválida.");
            }
        }
        scanner.close();
    }
}