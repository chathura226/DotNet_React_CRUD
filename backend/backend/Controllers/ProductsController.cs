using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    // POST /api/products {body}
    // GET /api/products 
    // GET /api/products/1
    // PUT /api/products/2 {body}
    // DELETE /api/products/2

    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
        _context = context;
    }


    [HttpPost] // POST /api/Products
    public async Task<IActionResult> AddProduct(Product product)
    {
        try{
            _context.Products.Add(product); // this will add to in-memory cache
            await _context.SaveChangesAsync();//db will be updated
            return CreatedAtRoute("GetProduct", new { id = product.Id }, product); //201 created status code+ LOCATION OF THE RESOURCE (BASEADDRESS/API/PRODUCTS/ID) + product obj
            

        }catch(Exception ex){
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpGet] // Get /api/Products
    public async Task<IActionResult> GetProducts()
    {
        try{

            var products= await _context.Products.ToListAsync();
            return Ok(products); //200 ok status code + product obj
            

        }catch(Exception ex){
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpGet("{id:int}", Name ="GetProduct")] // Get /api/Products/1
    public async Task<IActionResult> GetProduct(int id)
    {
        try{

            var product= await _context.Products.FindAsync(id);
            if(product is null){
                return NotFound(); //404 not found status code
            }
            return Ok(product); //200ok status code + product obj
            

        }catch(Exception ex){
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpPut("{id:int}")] // PUT /api/Products/1
    public async Task<IActionResult> UpdateProduct(int id,[FromBody] Product product)
    {
        try{
            if(id != product.Id){
                return BadRequest("Product ID mismatch"); //400 bad request status code
            }
            if(!await _context.Products.AnyAsync(p => p.Id == id)){
                return NotFound(); //404 not found status code
            }
            _context.Products.Update(product); // this will add to in-memory cache
            await _context.SaveChangesAsync();//db will be updated
            return NoContent(); //204 no content status code

        }catch(Exception ex){
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpDelete("{id:int}")] // DELETE /api/Products/1
    public async Task<IActionResult> DeleteProduct(int id)
    {
        try{
            
            var product= await _context.Products.FindAsync(id);
            if(product is null){
                return NotFound(); //404 not found status code
            }
            _context.Products.Remove(product); 
            await _context.SaveChangesAsync();//db will be updated
            return NoContent(); 

        }catch(Exception ex){
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

}
