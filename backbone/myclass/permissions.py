from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of a MyClass instance to edit it.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True  # Allow read permissions for any request
        # Write permissions are only allowed to the owner of the MyClass instance
        return obj.coach.user == request.user
