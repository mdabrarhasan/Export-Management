namespace ImportExport.UI.Models.Combine
{
    public class SCMatchResult
    {
        public bool matches { get; set; }
        public List<string> mismatchedFields { get; set; } = new List<string>();
    }
}