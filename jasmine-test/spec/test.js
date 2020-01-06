describe("searchBirdCall", function() {
  describe("Alert tests", function() {
    it("should return custom title and value", function() {
      const row = renderBirdFileRow("custom title", "value");
      expect(row).toEqual(`
      <tr>
          <td class="bold-text">custom title:</td>
          <td>value</td>
      </tr>
    `);
    });
  });
});
