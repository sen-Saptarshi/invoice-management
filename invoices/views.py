from rest_framework import viewsets
from rest_framework.response import Response
from .models import Invoice
from .serializers import InvoiceSerializer

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

    def destroy(self, request, *args, **kwargs):
        invoice = self.get_object()
        invoice.delete()
        return Response({"message": "Invoice deleted successfully"})
