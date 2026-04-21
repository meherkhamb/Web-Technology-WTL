import jakarta.servlet.http.*;
import jakarta.servlet.*;
import java.io.*;
import java.sql.*;

public class DemoServlet extends HttpServlet {

    public void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {

        res.setContentType("text/html");
        PrintWriter pw = res.getWriter();

        pw.println("<html><body>");
        pw.println("<h2>Welcome to Pragati eBookShop</h2>");
        pw.println("<table border='3'>");
        pw.println("<tr><th>ID</th><th>Title</th><th>Author</th><th>Price</th><th>Qty</th></tr>");

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection con = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/pragati", "root", "YOUR_PASSWORD");

            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM ebookshop");

            while (rs.next()) {
                pw.println("<tr>");
                pw.println("<td>" + rs.getInt(1) + "</td>");
                pw.println("<td>" + rs.getString(2) + "</td>");
                pw.println("<td>" + rs.getString(3) + "</td>");
                pw.println("<td>" + rs.getDouble(4) + "</td>");
                pw.println("<td>" + rs.getInt(5) + "</td>");
                pw.println("</tr>");
            }

            con.close();

        } catch (Exception e) {
            pw.println(e);
        }

        pw.println("</table>");
        pw.println("</body></html>");
    }
}