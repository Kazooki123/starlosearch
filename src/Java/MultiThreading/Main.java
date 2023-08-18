public class Main {
    public static void main(String[] args) {
        int numThreads = 3; // You can adjust the number of threads as needed

        ThreadManager threadManager = new ThreadManager(numThreads);
        threadManager.startThreads();
    }
}