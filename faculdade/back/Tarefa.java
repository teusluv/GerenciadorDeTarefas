package back;


public class Tarefa {
    private int id;
    private String descricao;
    private boolean concluida;
    
    public Tarefa(int id, String descricao) {
        this.id = id;
        this.descricao = descricao;
        this.concluida = false;
    }
    public int getId() {
        return id;
    }
    public String getDescricao() {
        return descricao;
    }
    public boolean isConcluida() {
        return concluida;
    }
    public void setConcluida(boolean concluida) {
        this.concluida = concluida;
    }
    @Override
    public String toString() {
       String status = concluida ? "[X]" : "[ ]";
         return id + ". " + status + " " + descricao;
    }

}