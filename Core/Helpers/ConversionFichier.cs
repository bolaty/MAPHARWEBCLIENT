using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using System.Web.Hosting;

namespace Core
{
    public class ConversionFichier
    {
        public static string extentionDocument(string extention, string fileName, ReportDocument documentRpt, string cheminFichier)
        {
            
            if (string.IsNullOrWhiteSpace(extention))
            {
                fileName += ".pdf";
                documentRpt.ExportToDisk(ExportFormatType.PortableDocFormat, cheminFichier + fileName);
            }
            else
            {
                switch (extention.ToLower())
                {
                    case "text":
                    case ".txt":
                    case "txt":
                    fileName += ".txt";
                    documentRpt.ExportToDisk(ExportFormatType.Text, cheminFichier + fileName);
                    break;
                    case "xml":
                    case ".xml":
                    fileName += ".xml";
                    documentRpt.ExportToDisk(ExportFormatType.Xml, cheminFichier + fileName);
                    break;
                    case "word":
                    case ".doc":
                    case ".docx":
                    case "doc":
                    fileName += ".doc";
                    documentRpt.ExportToDisk(ExportFormatType.WordForWindows, cheminFichier + fileName);
                    break;
                    case "excel":
                    case ".xls":
                    case "xls":
                    fileName += ".xls";
                    documentRpt.ExportToDisk(ExportFormatType.Excel, cheminFichier + fileName);
                    break;
                    case ".xlsx":
                    case "xlsx":
                    fileName += ".xlsx";
                    documentRpt.ExportToDisk(ExportFormatType.ExcelWorkbook, cheminFichier + fileName);
                    break;
                    case ".pdf":
                    case "pdf":
                    fileName += ".pdf";
                    documentRpt.ExportToDisk(ExportFormatType.PortableDocFormat, cheminFichier + fileName);
                    break;
                    case "sansformat":
                    fileName += ".xls";
                    documentRpt.ExportToDisk(ExportFormatType.Text, cheminFichier + fileName);
                    break;
                    default:
                    fileName += ".pdf";
                    documentRpt.ExportToDisk(ExportFormatType.PortableDocFormat, cheminFichier + fileName);
                    break;
                }
            }

            return fileName;

        }
    }

}
