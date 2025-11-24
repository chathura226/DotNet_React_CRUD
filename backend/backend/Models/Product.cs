using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Product 
{
    public int Id { get; set; }

    [Required]
    [MaxLength(30)]
    public string Name { get; set; }=string.Empty;

    [Required]
    [Range(0.01, double.MaxValue)]
    public decimal UnitPrice { get; set; } 
}
